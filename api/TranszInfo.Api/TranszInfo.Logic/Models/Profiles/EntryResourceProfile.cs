using AutoMapper;
using TranszInfo.Domain.Models;

namespace TranszInfo.Logic.Models.Profiles
{
    public class EntryResourceProfile : Profile
    {
        public EntryResourceProfile()
        {
            CreateMap<Entryresource, EntryResourceModel>()
                .ForMember(dest => dest.ResourceId, opt => opt.MapFrom(src => src.Resourceid))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type))
                .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Link, opt => opt.MapFrom(src => src.Link));
        }
    }
}
