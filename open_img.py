import requests

gdriveURL = "https://drive.google.com/file/d/1p7XZPUwq4GVzMee38MYdcoxhKwzOD0c4/view"

charList = []
turn = 0
for c in gdriveURL:
    if c == '/':
        turn += 1
    elif c == 'd' and turn == 1:
        turn += 1
    elif c == '/' and turn == 2:
        turn += 1
    elif turn == 3:
        charList.append(c)
    else:
        turn = 0
imgID = ''.join(charList)

# imgID = "1p7XZPUwq4GVzMee38MYdcoxhKwzOD0c4"
response = requests.get("https://drive.google.com/uc?export=download&id=" + imgID)
file = open("sample_image.png", "wb")
file.write(response.content)
file.close()