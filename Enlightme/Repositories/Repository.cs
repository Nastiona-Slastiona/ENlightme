using Enlightme.Interfaces;
using Enlightme.Specifications;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Enlightme.Repositories
{
    public class Repository<TContext,TEntity>
        where TContext : DbContext
        where TEntity : class, IHasId
    {
        private readonly TContext dataContext;
        protected readonly DbSet<TEntity> DbSet;

        public Repository(TContext dataContext)
        {
            this.dataContext = dataContext;
            DbSet = dataContext.Set<TEntity>();
        }

        public TEntity Create(TEntity entity)
        {
            dataContext.Add<TEntity>(entity);
            entity.Id = dataContext.SaveChanges();

            return entity;
        }

        protected virtual IQueryable<TEntity> GetDbSet()
        {
            return DbSet;
        }

        public TEntity GetFirstOrDefault<TEntity>(Specification<TEntity> specification)
        {
            IQueryable<TEntity> query = (IQueryable<TEntity>)GetDbSet();
            Expression<Func<TEntity, bool>> expression = specification?.ToExpression();
            if (expression != null)
            {
                query= query.Where(expression);
            }

            return query.FirstOrDefault();
        }
    }
}
