def format_number(num):
    """数値を百千万億兆の単位で表示する"""
    if num < 100:
        return str(num)
    elif num < 1000:
        return f"{num}"
    elif num < 10000:
        return f"{num//1000}千{num%1000 if num%1000 != 0 else ''}"
    elif num < 100000000:
        return f"{num//10000}万{num%10000//1000 if num%10000//1000 != 0 else ''}千{num%1000 if num%1000 != 0 else ''}"
    elif num < 1000000000000:
        return f"{num//100000000}億{num%100000000//10000 if num%100000000//10000 != 0 else ''}万{num%10000//1000 if num%10000//1000 != 0 else ''}千{num%1000 if num%1000 != 0 else ''}"
    else:
        return f"{num//1000000000000}兆{num%1000000000000//100000000 if num%1000000000000//100000000 != 0 else ''}億{num%100000000//10000 if num%100000000//10000 != 0 else ''}万{num%10000//1000 if num%10000//1000 != 0 else ''}千{num%1000 if num%1000 != 0 else ''}"

total = 1
for i in range(1, 51):
    if i == 1:
        print(f"{i}")
    else:
        result = total * i
        print(f"{format_number(total)}掛ける{i}は{format_number(result)}です！")
        total = result
