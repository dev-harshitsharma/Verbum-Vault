using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IBookRepository
    {
        Task<Book> GetBookByIdAsync(int id);
        Task<IReadOnlyList<Book>> GetBooksAsync();

        Task<Book> AddBookAsync(Book book);

        Task UpdateBookAsync(Book book);

        Task BorrowBookAsync(int bookId, int currentlyBorrowedByUserId, int? lentByUserId);

        Task<IReadOnlyList<Book>> GetBooksLentByUser(int userId);

        Task<IReadOnlyList<Book>> GetBooksBorrowedByUser(int userId);
    }
}
