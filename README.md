# knitweb
knitting web app frontend and backend

knitting pattern editor

## Pattern Generator Usage:

1. Load a pattern using 'Browse'.
2. Then tick 'crop' if the pattern wants to be cropped and then click 'Draw'. 
3. Then select available yarn colours from the pallette.
4. Then Click 'Generate Patteren'.

## Offline Pattern Generation:

####On Linux
1. Go to /knitweb/offline_app directory.
2. run the run.sh file typing sh run.sh

####On Windows
1. Go to /knitweb/offline_app directory.
2. run the run.bat

## Drawing tools usage

There are two kinds of drawing tools included inside the pattern grid.

1. Square/Rectangular pattern drawing.
2. Free hand pattern drawing.

-------Under Square/Rectangular pattern drawing user will be able to draw rectangular shapes and add colours to the shape using colour pallette.------------

-------Under Free hand pattern drawing user will be able to draw using free hand and add colour values to the shape drawn.-----------

Note: These drawing tools are now used to edit the patterns that are loaded from a file.
This can be improved such that user can draw a pattern from scratch using these tools that 
can be used for knitting. 


##Flow of UI Functions

####Loading of a pattern / image
![alt tag](/docs/demo_images/1.png?raw=true)

Step1: Choose image/pattern file from choose file dialog. It will load a image file to the image loader [left
side] and it will load the preview of the pattern to the window at the right side.

####Crop/Rotate of a pattern

![alt tag](?raw=true/docs/demo_images/2.png?raw=true)

Step1:Enable crop function by checking “Enable Cropping” check box.	
Step2: select cropping area from the pattern and the click crop button at the bottom-right of the image
loader. It will load the cropped pattern in the preview window. You can also rotate the pattern from the
preview window before editing.

####Add available yarn color

![alt tag](/docs/demo_images/3.png?raw=true)

Step1:User can add available yarn colors before pattern generation by clicking add yarn color button.
Colour palette is shown to the user after clicking the button.

####Generate pattern

![alt tag](/docs/demo_images/4.png?raw=true)

Step1: Click generate pattern icon after selecting yarn colors. Then pattern will be generated for a 100 by
100 grid as the default parameters. User can regenerate the pattern by entering row and column values and
regenerate the pattern.

####Square/ Free Hand tool

![alt tag](/docs/demo_images/5.png?raw=true)

Step1:Select Square or free hand tools from the radio panel. By default it is square tool.

![alt tag](/docs/demo_images/6.png?raw=true)

Step2: Select a color from colour palette and select fill if you want to add the colour for the selected area.

####Show color Regions function

Step1:Select area from the square selection if you want a color regions for selected area. Otherwise
generate color regions for all area by selecting “Show Colour Regions[all area]”. Black coloured border
will be shown around the region

![alt tag](/docs/demo_images/8.png?raw=true)

Step2: Add a colour selected in colour palette by clicking on the relevant area you want to edit by changing
colour. In the example bottom region is recolored.

![alt tag](/docs/demo_images/9.png?raw=true)

####Available Ports/Machine type

Step1: User is shown available ports and machine types available for knitting. If it is not shown click
refresh button. Here knit web client is communicates with the knit lib server to get data.

![alt tag](/docs/demo_images/11.png?raw=true)

Step2: After editing is done click “Proceed Knitting” button to create a knit job for the pattern.

####Knitting Simulator

![alt tag](/docs/demo_images/12.png?raw=true)

Knitting simulator window will show the edited pattern. Column and row will show current stitch's knitting
row and column number. Colors field show number of colour values used in the pattern. Also there are
inputs taken such as Start Line, Infinite repeat, Start Needle, Stop Needle used for configuration of a knit
job.

![alt tag](/docs/demo_images/13.png?raw=true)

After configuration options are available to start knit job, pause and stop knit job.

####Navigation bar options

Open/Download Pattern/Import Pattern

![alt tag](/docs/demo_images/14.png?raw=true)

User is able to download the pattern after editing without going for a knit job configuration.

####Translate application page

![alt tag](/docs/demo_images/15.png?raw=true)

This feature enables translation of application fields text into several languages such as English, German,
Sinhala. Solution is added such that any language can be added to the application just by editing a language
data file. Therefore it is a scalable solution. German translation is shown below.

![alt tag](/docs/demo_images/16.png?raw=true)



