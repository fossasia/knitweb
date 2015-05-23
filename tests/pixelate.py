from PIL import Image
 
backgrndColor = 1
pixelSize = 8
 
image = Image.open('input.png')
image = image.resize((image.size[0]/pixelSize, image.size[1]/pixelSize), Image.NEAREST)
image = image.resize((image.size[0]*pixelSize, image.size[1]*pixelSize), Image.NEAREST)
pixel = image.load()

for i in range(0,image.size[0],pixelSize):
  for j in range(0,image.size[1],pixelSize):
    for r in range(pixelSize):
     pixel[i+r,j] = backgrndColor
     pixel[i,j+r] = backgrndColor
 
image.save('output.png') 
