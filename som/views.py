from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_exempt
from som.models import *
import requests, json
from django.template import Context

# Create your views here.
def index(request):
  return HttpResponse(render(request, "som/index.html"))

def graph(request):
	return HttpResponse(render(request, "som/graph.html"))

def som(request):
	return HttpResponse(render(request, "som/SoM.html"))

def buildGraphJSON(initNode, no_content):
	children = Node.objects.filter(parent=initNode)
	buildList = []

	for child in children:
		x = (child.id * 10) - 10
		y = (child.id * 10) + 10
		dataType = -1
		data = ""
		if child.image != None:
			dataType = 1
			data = child.image
		elif child.text != None:
			dataType = 1
			data = child.text
		else:
			dataType = 1
			data = child.doodle

		if no_content:
			data = child.caption

		buildList += [[child.id, data, [x, y], dataType, [], buildGraphJSON(child, no_content)]]

	return buildList
def focus(request):
	tid = request.GET["target"]
	p = Ping(target=Node.objects.get(id=tid))
	p.save()
	return HttpResponse("ok")

def poll(request):
	no_content = False
	try: no_content = request.GET["no_content"]
	except: pass

	initNode = Node.objects.get(parent=None)
	text = initNode.text
	if no_content:
		text = initNode.caption
	graph = [initNode.id, text, [0, 0], 1, [], buildGraphJSON(initNode, no_content)]

	if no_content:
		return HttpResponse(json.dumps(graph))

	pings = Ping.objects.all()
	pid = -1
	if len(pings):
		pid = pings[0].target.id
		pings[0].delete()

	return HttpResponse(json.dumps([graph, pid]))

@csrf_exempt
def newSession(request):
	text = request.POST['text']
	caption = request.POST['caption']

	print (text)

	Node.objects.all().delete()
	n = Node(parent=None, text=text, caption=caption, image=None, doodle=None)
	n.save()

	return HttpResponse(reverse('graph'))

def getTextInput(request):
	text = request.GET.get('text')
	caption = request.GET.get('caption')
	selectedNode = int(request.GET.get('selectedNode'))

	print ("got text " + text)
	print ("node: " + str(selectedNode))

	if selectedNode == -1:
		parent = Node.objects.get(parent=None)
	else:
		parent = Node.objects.get(id=selectedNode)
	n = Node(parent=parent, text=text, caption=caption, image=None, doodle=None)
	n.save()

	return HttpResponse(n.id)

def get_query_from_selection(selection):
	query = ""
	if selection == -1:
		selection = Node.objects.get(parent=None).id
	try:
		node = Node.objects.get(id=selection)
		query += node.caption
		node = Node.objects.get(id=node.parent.id)
		query += " " + node.caption
	except: pass

	return query

def searchImage(request):
	query = request.GET.get('searchQuery')
	if (query == ""):
		selection = int(request.GET.get('selectedNode'))
		query = get_query_from_selection(selection)


	query.replace(" ", "+")
	print ("YOOOOOO")
	print (query)
	url = "https://api.gettyimages.com/v3/search/images?phrase=" + query
	header = {'Api-Key': '8ur8fhrrg6kgcckfz5er58vz'}
	req = requests.get(url, headers=header)

	return HttpResponse(req.text)



def getImageInput(request):
	image = request.GET.get('image')
	selectedNode = int(request.GET.get('selectedNode'))
	caption = request.GET.get('caption')
	print ("got image " + image)
	#print "node: " + selectedNode

	if caption == "":
		caption = get_query_from_selection(selectedNode)

	if selectedNode == -1:
		parent = Node.objects.get(parent=None)
	else:
		parent = Node.objects.get(id=selectedNode)
	n = Node(parent=parent, text=None, caption=caption, image=image, doodle=None)
	n.save()

	return HttpResponse(n.id)

def deleteNode(request):
	deleteNode = request.GET.get('deleteNode')
	Node.objects.get(id=deleteNode).delete()
	return HttpResponse("ok")

def getDoodleInput(request):
	doodle = request.GET.get('doodle')
	selectedNode = int(request.GET.get('selectedNode'))
	caption = "doodle"

	if selectedNode == -1:
		parent = Node.objects.get(parent=None)
	else:
		parent = Node.objects.get(id=selectedNode)

	print ("got doodle " + doodle)

	n = Node(parent=parent, text=None, caption=caption, image=doodle, doodle=None)
	n.save()
	return HttpResponse("ok")