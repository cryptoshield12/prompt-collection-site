---
layout: default
title: รวม Prompt P1 - Professional Photography
permalink: /prompts/
---

<h1 class="section-title">รวม Prompt P1 - Professional Photography</h1>
<p class="tagline" style="text-align: center; margin-top: -20px; margin-bottom: 40px;">ชุดคำสั่งสร้างภาพถ่ายระดับมืออาชีพ 30 ชุด เน้นความละเอียดสูงและเทคนิคการถ่ายภาพเฉพาะทาง</p>

<div class="prompts-grid">
{% assign p1_prompts = site.prompts | where: "set", "P1" | sort: "title" %}
{% for prompt in p1_prompts %}
    <div class="prompt-card">
        <div class="card-header">
            <h3><a href="{{ prompt.url }}">{{ prompt.title }}</a></h3>
            <span class="category-badge">{{ prompt.category }}</span>
        </div>
        <p class="card-description">{{ prompt.description }}</p>
        <div class="prompt-content">
            <code class="prompt-text">{{ prompt.prompt | truncate: 200 }}</code>
        </div>
        <div class="card-footer">
            <button class="copy-btn" data-prompt="{{ prompt.prompt }}">
                <span class="copy-icon">📋</span> Copy
            </button>
            <div class="tags">
                {% for tag in prompt.tags %}
                    {% include tag-badge.html tag=tag %}
                {% endfor %}
            </div>
        </div>
    </div>
{% endfor %}
</div>

<style>
/* Temporary styles for prompts.md to use the existing UI styles */
.prompts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
}

/* Reusing styles from style.css for consistency */
</style>
