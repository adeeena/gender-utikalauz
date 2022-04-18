namespace TranszInfo.Api.DTOs
{
    public class CategoryEntriesResultDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IList<EntryDto> Entries { get; set; }
    }
}
