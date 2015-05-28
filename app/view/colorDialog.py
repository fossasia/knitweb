  

 def mygetpalette(pal_type, orig_image_palette):
        # return palette list of tuples in RGB
        palette = []
        if pal_type != "RGB":
            return palette
        image_palette=orig_image_palette[:]
        while image_palette != []:
            r = image_palette.pop(0)
            g = image_palette.pop(0)
            b = image_palette.pop(0)
            palette.append( (r, g, b) )
        return palette
    
    if mono_image:
        indexed_palette=[]
    else:
        indexed_palette=mygetpalette(pal_type,pal_data)
