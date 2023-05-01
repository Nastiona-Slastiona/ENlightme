using System.Linq.Expressions;
using System.Collections;


namespace Enlightme.Repositories;

public class IncludedPropertyCollection<T> : IEnumerable<Expression<Func<T, object>>>
{
    private readonly List<Expression<Func<T, object>>> includeExpressions;

    public IncludedPropertyCollection()
    {
        includeExpressions = new List<Expression<Func<T, object>>>();
    }

    public IncludedPropertyCollection(Expression<Func<T, object>> expression)
    {
        includeExpressions = new List<Expression<Func<T, object>>> { expression };
    }

    public IncludedPropertyCollection(List<Expression<Func<T, object>>> expressions)
    {
        includeExpressions = expressions ?? throw new ArgumentNullException(nameof(expressions));
    }

    public IncludedPropertyCollection(Selector<T, object> selector)
    {
        includeExpressions = new List<Expression<Func<T, object>>> { selector.ToExpression() };
    }

    public IncludedPropertyCollection(List<Selector<T, object>> selectors)
    {
        includeExpressions = selectors
                                 ?.Select(s => s.ToExpression())
                                 .ToList()
                             ?? throw new ArgumentNullException(nameof(selectors));
    }

    public IncludedPropertyCollection<T> Add(Selector<T, object> selector)
    {
        includeExpressions.Add(selector.ToExpression());

        return this;
    }

    public IncludedPropertyCollection<T> Add(IEnumerable<Selector<T, object>> selectors)
    {
        includeExpressions.AddRange(selectors.Select(s => s.ToExpression()));

        return this;
    }

    public IncludedPropertyCollection<T> Add(Expression<Func<T, object>> expression)
    {
        includeExpressions.Add(expression);

        return this;
    }

    public IncludedPropertyCollection<T> Add(IEnumerable<Expression<Func<T, object>>> expressions)
    {
        includeExpressions.AddRange(expressions);

        return this;
    }

    public IEnumerator<Expression<Func<T, object>>> GetEnumerator()
    {
        return includeExpressions.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return GetEnumerator();
    }
}
