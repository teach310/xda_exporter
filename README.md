# xda_exporter
export AdobeXd artboard as xda file

# Reference

![2019-02-12 23 01 36](https://user-images.githubusercontent.com/16421323/52640754-9bbcaf00-2f1a-11e9-8e27-83ada742d9b1.jpg)

## Artboard
|Prop|Description|
|:--|:--|
|guid|guid of self|
|component|"Artboard"|
|name|name of artboard|
|width| artboard width|
|height| artboard height|

## Rectangle
|Prop|Description|
|:--|:--|
|guid|guid of self|
|component|"Rectangle"|
|name|name of node|
|parentGuid|guid of parent node |
|artboardPosX| left-top pos x |
|artboardPosY| left-top pos y |
|width| artboard width|
|height| artboard height|
|color| hex color like "#FFF"|

edit later

# Unity
you can use xda by unity.
https://github.com/teach310/Xd2uGUI

# ReleaseNotes

## 1.0.1
Map all node type.
Export artboards

## 1.0.0
Export artboard as xda.
Map Rectangle, Artboard, Text, Group

# License
This library is under the MIT License.
