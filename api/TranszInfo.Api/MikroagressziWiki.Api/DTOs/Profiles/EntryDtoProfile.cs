using AutoMapper;
using TranszInfo.Logic.Models;

namespace TranszInfo.Api.DTOs.Profiles
{
    public class EntryDtoProfile : Profile
    {
        public EntryDtoProfile()
        {
            CreateMap<EntryModel, EntryDto>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.Categories))
                .ForMember(dest => dest.RelatedEntries, opt => opt.MapFrom(src => src.RelatedEntries))
                .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => src.Categories))
                .ForMember(dest => dest.Resources, opt => opt.MapFrom(src => src.Resources));
        }
    }
}
