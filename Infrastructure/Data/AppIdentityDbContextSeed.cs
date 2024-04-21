using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var userOne = new AppUser
                {
                    DisplayName = "Harshit",
                    // DisplayName = "FirstUser",
                    TokensAvailable = 1,
                    UserName = "Harshit1912",
                    Password = "Pa$$w0rd"
                };

                await userManager.CreateAsync(userOne, userOne.Password);

                var userTwo = new AppUser
                {
                    DisplayName = "Ankit",
                    // DisplayName = "SecondUser",
                    TokensAvailable = 1,
                    UserName = "Ankit1912",
                    Password = "Pa$$w0rd"
                };

                await userManager.CreateAsync(userTwo, userTwo.Password);

                var userThree = new AppUser
                {
                    DisplayName = "Rachit",
                    // DisplayName = "ThirdUser",
                    TokensAvailable = 1,
                    UserName = "Rachit1912",
                    Password = "Pa$$w0rd"
                };

                await userManager.CreateAsync(userThree, userThree.Password);

                var userFour = new AppUser
                {
                    DisplayName = "Mayank",
                    // DisplayName = "FourthUser",
                    TokensAvailable = 1,
                    UserName = "Mayank1912",
                    Password = "Pa$$w0rd"
                };

                await userManager.CreateAsync(userFour, userFour.Password);
            }
        }
    }
}
