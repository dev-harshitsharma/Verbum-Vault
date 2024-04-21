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
using Microsoft.Extensions.Configuration.UserSecrets;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> userManager;
        private readonly SignInManager<AppUser> signInManager;
        private readonly ITokenService tokenService;
        private readonly IMapper mapper;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper
        )
        {
            this.signInManager = signInManager;
            this.tokenService = tokenService;
            this.userManager = userManager;
            this.mapper = mapper;
        }

        /// This is the method to Get the Current logged in user with their detials

        [HttpGet("getCurrentUser")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var name = HttpContext.User
                ?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Name)
                ?.Value;

            var user = await userManager.FindByNameAsync(name);

            var userDetailsDto = mapper.Map<AppUser, UserDetailsDto>(user);

            return Ok(userDetailsDto);
        }

        // This is the method to Check if the user exists or not
        [HttpGet("userexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string name)
        {
            return await userManager.FindByNameAsync(name) != null;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByNameAsync(loginDto.UserName);

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401));
            }

            var result = await signInManager.CheckPasswordSignInAsync(
                user,
                loginDto.Password,
                false
            );

            if (!result.Succeeded)
                return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = tokenService.CreateToken(user),
                TokensAvailable = user.TokensAvailable,
            };
        }
    }
}
