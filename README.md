# State of Mind
State-Of-Mind is a Collaborative Brain-Storming Web Application with suggestions developed in a 24hr Hackathon.<br />
The idea of the project is to have a **main screen**, which will be displayed to everyone through a large monitor/projector, and would display the mind map.<br />
**Collaborators** will then seemlessly connect to the app using their preferred devices and begin brainstorming.<br />
In the middle of topic if collaborators are out of ideas they can then ask for **suggestions** from the app.

## Installation and Usage

First Install [Django](https://www.djangoproject.com/download/) and clone the project. Then:

```sh
$ cd state-of-mind
```

Start the **Django Server** with your IP and any Port:

```sh
$ python manage.py runserver XXX.XX.XX.XXX:PORT
```

On the **main display** open a browser go to the following URL:

```
http://XXX.XXX.XXX.XXX:PORT/som/
```
Enter a Topic you would like to brainstorm about and Click *Begin*. It should display the main node with your Topic.

Then on the **collaborators'** devices (phone/tablet/computer) open a browser and go the following URL:

```
http://XXX.XXX.XXX.XXX:PORT/som/som/
```

## Collaborator

Collaborators should be greeted with a *text input* page. The **Collaborator** UI is broken down to 3 parts:
* Insert Text
* Insert Image
* Insert Doodle

They are in seperate pages that can be accessed through the **right & left arrows** on the top right corner.

#### Inserting Text
Type your thoughts/ideas in textbox and press the **up arrow** on bottom right of screen to insert Node with text.

#### Inserting Image
Navigate to the **Insert Image** page using the **right/left arrows** on top right corner. Search for an image you want to insert, click on the **search icon** to search for image. Once results are displayed, select an the image you want and press the **up arrow** on bottom right of the screen to insert Node with image.<br/>
_We are using [**getty image**](http://developers.gettyimages.com/en/) API for the image search._

#### Getting Suggestions
In a given node, if you need **suggestions**, navigate to the **insert image** page, and click on the **search icon** while the search bar is empty. It will **suggest an image relating the current node's topic and the previous one**.

#### Inserting Doodle
Navigate to the **Insert Doodle** page using the **right/left arrows** on top right corner. Doodle on the canvas using your finger/mouse. _(NOTE: We do **not** support all phone browsers)_

### Navigating Between Nodes
There's a **menu button** on the top left corner of the screen. It displays the names of all the nodes on the mind map. When you click on one of them, the **mind map** will go to the selected node, and any **new nodes added will be added to that node.**

### Deleting Nodes
In the same **menu button** there is a small **trash icon** near each node. When clicked it will **remove the respective node and all nodes added to it** from the main map. The **initial main topic node** will then be selected. Any new nodes will be **added to it**, unless different nodes are selected.

# Contribution

This was a hackathon project developed in 24hr. The code may not be the cleanest in the world, and bugs are bound to be there. Any bug fixes or extra features that any of you would like add will be more than welcome.



