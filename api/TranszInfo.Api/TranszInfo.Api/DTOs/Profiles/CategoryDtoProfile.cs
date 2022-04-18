using AutoMapper;
using TranszInfo.Api.DTOs;
using TranszInfo.Logic.Models;

namespace TranszInfo.Api.DTOs.Profiles
{
    public class CategoryDtoProfile : Profile
    {
        public CategoryDtoProfile()
        {
            CreateMap<CategoryModel, CategoryDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Order, opt => opt.MapFrom(src => src.Order))
                .ForMember(dest => dest.Icon, opt => opt.MapFrom(src => src.Icon))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description));
        }
    }
}
