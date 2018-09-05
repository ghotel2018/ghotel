# coding=utf-8

a = "【 东直门、工体、雍和宫地区 燕莎、三里屯商业区】"
if "】" in a:
    a = a[a.index("】") + 1:]
print(a)

b = []
b.append(1)
b.append(1)
b.append(1)

print(b)
