using System;
using System.Collections.Generic;

namespace TranszInfo.Domain.Models
{
    public partial class Category
    {
        public Category()
        {
            Entries = new HashSet<Entry>();
        }

        public string Id { get; set; }
        public string Name { get; set; }
        public int? Order { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
        public string LanguageCode { get; set; }

        public virtual ICollection<Entry> Entries { get; set; }
    }
}
