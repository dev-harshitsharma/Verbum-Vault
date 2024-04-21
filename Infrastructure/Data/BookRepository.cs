using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class BookRepository : IBookRepository
    {
        private readonly StoreContext context;

        public BookRepository(StoreContext context)
        {
            this.context = context;
        }

        public async Task<Book> AddBookAsync(Book book)
        {
            context.Books.Add(book);
            await context.SaveChangesAsync();

            return book;
        }

        public async Task BorrowBookAsync(int id, int currentlyBorrowedByUserId, int? lentByUserId)
        {
            var book = await context.Books.FindAsync(id);

            if (book != null && book.IsBookAvailable)
            {
                book.IsBookAvailable = false;

                var lender = await context.Users.FindAsync(lentByUserId);
                var borrower = await context.Users.FindAsync(currentlyBorrowedByUserId);

                if (lender != null && borrower != null)
                {
                    lender.TokensAvailable += 1;
                    borrower.TokensAvailable -= 1;

                    book.CurrentlyBorrowedByUserId = currentlyBorrowedByUserId;
                    book.LentByUserId = lentByUserId;

                    await context.SaveChangesAsync();
                }
            }
        }

        public async Task<Book> GetBookByIdAsync(int id)
        {
            return await context.Books.FindAsync(id);
        }

        public async Task<IReadOnlyList<Book>> GetBooksAsync()
        {
            return await context.Books.ToListAsync();
        }

        public async Task<IReadOnlyList<Book>> GetBooksBorrowedByUser(int userId)
        {
            return await context.Books
                .Where(b => b.CurrentlyBorrowedByUserId == userId)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<Book>> GetBooksLentByUser(int userId)
        {
            return await context.Books.Where(b => b.LentByUserId == userId).ToListAsync();
        }

        public async Task UpdateBookAsync(Book book)
        {
            context.Entry(book).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }
    }
}
