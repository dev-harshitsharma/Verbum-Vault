using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BookController : BaseApiController
    {
        private readonly IBookRepository repo;
        private readonly IMapper mapper;
        private readonly UserManager<AppUser> userManager;

        public BookController(
            IBookRepository repo,
            IMapper mapper,
            UserManager<AppUser> userManager
        )
        {
            this.userManager = userManager;
            this.mapper = mapper;
            this.repo = repo;
        }

        //API for getting all the books
    
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<BookToReturnDto>>> GetBooks(
            [FromQuery] string search
        )
        {
            var allBooks = await repo.GetBooksAsync();

            var filteredBooks = allBooks
                .Where(
                    book =>
                        string.IsNullOrEmpty(search)
                        || book.Name.Contains(search, StringComparison.OrdinalIgnoreCase)
                        || book.Genre.Contains(search, StringComparison.OrdinalIgnoreCase)
                        || book.Author.Contains(search, StringComparison.OrdinalIgnoreCase)
                )
                .ToList();

            var booksToReturn = mapper.Map<IReadOnlyList<Book>, IReadOnlyList<BookToReturnDto>>(
                filteredBooks
            );

            return Ok(booksToReturn);
        }

        //GET A SINGLE BOOK
        [HttpGet("{id}")]
        public async Task<ActionResult<BookToReturnDto>> GetBook(int id)
        {
            var specificBook = await repo.GetBookByIdAsync(id);

            var booktoReturn = mapper.Map<Book, BookToReturnDto>(specificBook);

            return booktoReturn;
        }

        //Add New Book
        [HttpPost]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> AddBook([FromBody] Book book)
        {
            if (book == null)
            {
                return BadRequest("Book cannot be null");
            }

            var name = HttpContext.User
                ?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Name)
                ?.Value;

            var user = await userManager.FindByNameAsync(name);
            int currentUserId = user.Id;

            book.LentByUserId = currentUserId;

            await repo.AddBookAsync(book);

            var bookToReturn = new BookToCreateDto
            {
                Name = book.Name,
                Rating = book.Rating,
                Author = book.Author,
                Genre = book.Genre,
                IsBookAvailable = book.IsBookAvailable,
                Description = book.Description,
                LentByUserId = currentUserId
            };
            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, bookToReturn);
        }

        //Borrow Book
        [HttpPost("borrow/{bookId}")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> BorrowBook(int bookId)
        {
            var book = await repo.GetBookByIdAsync(bookId);

            if (book == null)
            {
                return NotFound("Book not Found");
            }

            if (!book.IsBookAvailable)
            {
                return BadRequest("Book is not available for borrowing");
            }

            var user = await userManager.GetUserAsync(User);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var lenderId = book.LentByUserId;

            if (user.Id == lenderId)
            {
                return BadRequest("You cannot borrow a book you have added.");
            }

            if (lenderId == 0)
            {
                return BadRequest("Lender information not found for the book.");
            }

            if (user.TokensAvailable < 1)
            {
                return BadRequest("Not enough tokens to borrow the book.");
            }

            await repo.BorrowBookAsync(bookId, user.Id, lenderId);

            return Ok(new { message = "Book borrowed successfully." });
        }

        //Get Books Borrowed or lent by the user
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("getmybooksinfo")]
        public async Task<ActionResult<IReadOnlyList<BookToReturnDto>>> GetMyBooksInfo()
        {
            var name = HttpContext.User
                ?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Name)
                ?.Value;

            var user = await userManager.FindByNameAsync(name);

            if (user == null)
            {
                return BadRequest(new ApiResponse(400));
            }

            var lentBooks = await repo.GetBooksLentByUser(user.Id);

            var borrowedBooks = await repo.GetBooksBorrowedByUser(user.Id);

            var myBooks = lentBooks.Concat(borrowedBooks).ToList();

            var booksToReturn = mapper.Map<IReadOnlyList<Book>, IReadOnlyList<BookToReturnDto>>(
                myBooks
            );

            return Ok(booksToReturn);
        }
    }
};
