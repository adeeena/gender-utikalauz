using MikroagressziWiki.Domain.Models;

namespace TranszInfo.Logic.Models
{
    public class CategoryEntriesResultModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IList<EntryModel> Entries { get; set; }
    }
}
