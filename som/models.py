from django.db import models

class Node(models.Model):
    parent      = models.ForeignKey("Node", null=True, blank=True, related_name='node_parent')
    text		= models.CharField(max_length=10000, null=True)
    caption		= models.CharField(max_length=10000, null=True)
    image		= models.URLField(max_length=10000, null=True)
    doodle		= models.URLField(max_length=10000, null=True)

    def __unicode__(self):
        if self.parent == None:
            return "Main Node %s" % (self.text)
        else:
            return "Node Text: %s, Image: %s, Caption: %s, Doodle: %s" % (self.text, self.image, self.caption, self.doodle)

class Ping(models.Model):
    target      = models.ForeignKey(Node)
