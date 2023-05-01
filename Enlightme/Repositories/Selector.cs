using System.Linq.Expressions;
using LinqKit;

namespace Enlightme.Repositories;

public class Selector<T, TProp>
{
    private readonly Expression<Func<T, TProp>> expression;

    public Selector(Expression<Func<T, TProp>> expression)
    {
        this.expression = expression;
    }

    public Expression<Func<T, TProp>> ToExpression()
    {
        return expression;
    }

    public Selector<T, TProp2> Select<TProp2>(Selector<TProp, TProp2> innerSelector)
    {
        return Select(innerSelector.ToExpression());
    }

    public Selector<T, TProp2> Select<TProp2>(Expression<Func<TProp, TProp2>> innerExpression)
    {
        Expression<Func<T, TProp2>> newExpression = o => innerExpression.Invoke(expression.Invoke(o));

        return new(newExpression.Expand());
    }

    public Selector<TOrigin, TProp> ApplyFor<TOrigin>(Expression<Func<TOrigin, T>> baseExpression)
    {
        Expression<Func<TOrigin, TProp>> newExpression = o => expression.Invoke(baseExpression.Invoke(o));

        return new(newExpression.Expand());
    }
}
