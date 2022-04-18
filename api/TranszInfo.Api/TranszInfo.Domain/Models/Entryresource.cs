using System;
using System.Collections.Generic;

namespace TranszInfo.Domain.Models
{
    public partial class Entryresource
    {
        public string Entryid { get; set; }
        public string Resourceid { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public DateTime ModifiedAt { get; set; }
        public DateTime? DeletedAt { get; set; }

        public virtual Entry Entry { get; set; }
    }
}
