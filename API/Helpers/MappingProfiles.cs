using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Book, BookToReturnDto>();
            CreateMap<BookToReturnDto, Book>()
                .ForMember(dest => dest.LentByUserId, opt => opt.MapFrom(src => src.LentByUserId))
                .ForMember(
                    dest => dest.CurrentlyBorrowedByUserId,
                    opt => opt.MapFrom(src => src.CurrentlyBorrowedByUserId)
                )
                .ReverseMap();

            CreateMap<AppUser, UserDetailsDto>();
        }
    }
}
