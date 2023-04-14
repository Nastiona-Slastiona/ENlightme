namespace Enlightme.Core.Responses
{
    public class SuccessResponse
    {
        public IEnumerable<string> Messages { get; set; }

        public SuccessResponse() : this(new List<string>()) { }

        public SuccessResponse(string message) : this(new List<string>() { message }) { }

        public SuccessResponse(IEnumerable<string> messages)
        {
            Messages = messages;
        }
    }
}
