word = 'cat'
word2 = 'tac'
print(tuple(sorted(word)))
print(tuple(sorted(word2)))
print(sorted(word) == sorted(word2))

from collections import defaultdict


# Create mapping for `list_1`

mapping_1 = defaultdict(list)

# mapping_1 stores (sorted anagram) -> list[anagrams] mapping for `list_1`
list1 = ['dog','cat','god']
for word in list1:
    print(word)
    sorted_tuple = tuple(sorted(word)) # unique identifier of the anagram
    print(sorted_tuple)
    mapping_1[sorted_tuple].append(word)
    print(mapping_1)