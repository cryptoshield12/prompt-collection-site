---
layout: default
title: All Prompts
permalink: /prompts/
---

# All Prompts

{% assign sorted_prompts = site.prompts | sort: "title" %}

<div class="prompts-grid">
{% for prompt in sorted_prompts %}
    <div class="prompt-card">
        <div class="card-header">
            <h3><a href="{{ prompt.url }}">{{ prompt.title }}</a></h3>
            <span class="category-badge">{{ prompt.category }}</span>
        </div>
        <p class="card-description">{{ prompt.description }}</p>
        <div class="card-footer">
            <a href="{{ prompt.url }}" class="cta-button-small">View Details</a>
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
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;
    margin-top: 40px;
}

.prompt-card {
    background: var(--bg-secondary);
    border: 1px solid rgba(0, 212, 255, 0.15);
    border-radius: var(--radius-lg);
    padding: 24px;
    transition: all var(--transition-normal);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.prompt-card:hover {
    border-color: var(--accent-cyan);
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.05) 0%, rgba(123, 44, 191, 0.05) 100%);
    box-shadow: var(--shadow-lg);
    transform: translateY(-8px);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    gap: 12px;
}

.card-header h3 a {
    color: var(--text-primary);
    text-decoration: none;
    transition: color 0.2s;
}

.card-header h3 a:hover {
    color: var(--accent-cyan);
}

.category-badge {
    background: rgba(0, 212, 255, 0.15);
    color: var(--accent-cyan);
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    white-space: nowrap;
}

.card-description {
    color: var(--text-secondary);
    font-size: 0.95rem;
    margin-bottom: 16px;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: auto; /* Push to the bottom */
}

.tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.cta-button-small {
    padding: 8px 16px;
    background: var(--gradient-blue-purple);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    text-decoration: none;
}

.cta-button-small:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

/* Variables from style.css */
:root {
    --bg-secondary: #1a1a2e;
    --text-primary: #e0e0e0;
    --text-secondary: #a0a0a0;
    --gradient-blue-purple: linear-gradient(135deg, #00d4ff 0%, #7b2cbf 100%);
    --accent-cyan: #00d4ff;
    --shadow-lg: 0 16px 48px rgba(123, 44, 191, 0.2);
    --radius-lg: 16px;
    --radius-md: 12px;
    --transition-normal: 0.3s ease;
}
</style>
