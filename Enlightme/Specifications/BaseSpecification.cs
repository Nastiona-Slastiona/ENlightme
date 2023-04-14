using Enlightme.Entities;
using Enlightme.Interfaces;

namespace Enlightme.Specifications
{
    public static class BaseSpecification<TEntity> where TEntity : class, IHasId
    {
        public static Specification<User> ByEmail(string email)
        {
            return new(x => x.Email == email);
        }

        public static Specification<TEntity> ById(int id)
        {
            return new(x => x.Id == id);
        }

        public static Specification<RefreshToken> ByToken(string token)
        {
            return new(x => x.Token == token);
        }

        public static Specification<RefreshToken> ByUserId(int userId)
        {
            return new(x => x.UserId == userId);
        }
    }
}
