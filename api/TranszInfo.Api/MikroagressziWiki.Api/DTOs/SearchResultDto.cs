using MikroagressziWiki.Domain.Models;

namespace TranszInfo.Api.DTOs
{
    public class SearchResultDto
    {
        public IList<EntryDto> Entries { get; set; }
    }
}
