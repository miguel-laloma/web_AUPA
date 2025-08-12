---
layout: layout.njk
title: Blog
---
<h1>Blog</h1>
<ul>
{% for post in collections.blog %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a> - {{ post.date }}</li>
{% else %}
  <li>No hay posts aún.</li>
{% endfor %}
</ul>
