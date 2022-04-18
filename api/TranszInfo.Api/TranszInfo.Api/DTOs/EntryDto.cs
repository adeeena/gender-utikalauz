namespace TranszInfo.Api.DTOs
{
    public class EntryDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public IList<CategoryDto> Categories { get; set; }

        public IList<EntryDto> RelatedEntries { get; set; }

        public IList<EntryResourceDto> Resources { get; set; }
    }
}
