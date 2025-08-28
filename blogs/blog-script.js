// Blog Post JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeBlog();
});

function initializeBlog() {
    // Initialize all features
    setupReadingProgress();
    setupTableOfContents();
    setupSmoothScrolling();
    setupCodeHighlighting();
    setupSocialSharing();
    setupImageZoom();
    setupCopyCode();
    setupSearchHighlight();
    setupPrintButton();
    setupDarkModeToggle();
    setupMathRendering();
}

// Reading Progress Bar
function setupReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Table of Contents
function setupTableOfContents() {
    const toc = document.querySelector('.toc');
    if (!toc) return;

    const headings = document.querySelectorAll('.blog-content h2, .blog-content h3');
    const tocList = toc.querySelector('ul');
    
    headings.forEach((heading, index) => {
        // Add ID to heading if not present
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = heading.tagName.toLowerCase();
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
}

// Smooth Scrolling
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Code Highlighting
function setupCodeHighlighting() {
    // Add language indicators to code blocks
    document.querySelectorAll('pre').forEach(pre => {
        const code = pre.querySelector('code');
        if (code) {
            const language = code.className.replace('language-', '') || 'text';
            pre.setAttribute('data-language', language);
        }
    });
}

// Mathematical Formula Rendering
function setupMathRendering() {
    // Check if KaTeX is available
    if (typeof katex !== 'undefined') {
        renderMathFormulas();
    } else {
        // Load KaTeX if not available
        loadKaTeX();
    }
    
    // Setup math copy functionality
    setupMathCopy();
    
    // Setup equation numbering
    setupEquationNumbering();
}

function loadKaTeX() {
    // Load KaTeX CSS
    const katexCSS = document.createElement('link');
    katexCSS.rel = 'stylesheet';
    katexCSS.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
    katexCSS.integrity = 'sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn';
    katexCSS.crossOrigin = 'anonymous';
    document.head.appendChild(katexCSS);
    
    // Load KaTeX JS
    const katexJS = document.createElement('script');
    katexJS.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js';
    katexJS.integrity = 'sha384-cpW21h6RZv/phavutF+AuVYrr+dA8xD9zs6FwLpaCct6O9ctzYFfFr4dgmgccOTx';
    katexJS.crossOrigin = 'anonymous';
    katexJS.onload = renderMathFormulas;
    document.head.appendChild(katexJS);
}

function renderMathFormulas() {
    // Render inline math
    document.querySelectorAll('.math-inline').forEach(element => {
        try {
            katex.render(element.textContent, element, {
                throwOnError: false,
                displayMode: false
            });
        } catch (error) {
            console.warn('KaTeX rendering error:', error);
        }
    });
    
    // Render block math
    document.querySelectorAll('.math-block').forEach(element => {
        try {
            katex.render(element.textContent, element, {
                throwOnError: false,
                displayMode: true
            });
        } catch (error) {
            console.warn('KaTeX rendering error:', error);
        }
    });
    
    // Render LaTeX in code blocks
    document.querySelectorAll('code.language-latex').forEach(element => {
        const container = document.createElement('div');
        container.className = 'math-container';
        container.style.margin = '1rem 0';
        
        try {
            katex.render(element.textContent, container, {
                throwOnError: false,
                displayMode: true
            });
            element.parentNode.replaceChild(container, element.parentNode);
        } catch (error) {
            console.warn('KaTeX rendering error:', error);
        }
    });
}

function setupMathCopy() {
    // Add copy buttons to math containers
    document.querySelectorAll('.math-container, .katex-display').forEach(container => {
        const copyButton = document.createElement('button');
        copyButton.className = 'math-copy-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 2.5rem;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10;
        `;
        
        container.style.position = 'relative';
        container.appendChild(copyButton);
        
        container.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        container.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        copyButton.addEventListener('click', async () => {
            const latex = extractLatexFromElement(container);
            try {
                await navigator.clipboard.writeText(latex);
                copyButton.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy LaTeX:', err);
            }
        });
    });
}

function extractLatexFromElement(element) {
    // Try to find LaTeX source in data attributes or text content
    if (element.dataset.latex) {
        return element.dataset.latex;
    }
    
    // For KaTeX elements, try to extract the original LaTeX
    const katexElement = element.querySelector('.katex');
    if (katexElement && katexElement.dataset.originalText) {
        return katexElement.dataset.originalText;
    }
    
    // Fallback to text content
    return element.textContent.trim();
}

function setupEquationNumbering() {
    let equationCounter = 1;
    
    document.querySelectorAll('.math-container, .katex-display').forEach(container => {
        const equationNumber = document.createElement('span');
        equationNumber.className = 'equation-number';
        equationNumber.textContent = `(${equationCounter})`;
        container.appendChild(equationNumber);
        equationCounter++;
    });
}

// Social Sharing
function setupSocialSharing() {
    const shareButtons = document.querySelectorAll('.social-share a');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            const text = encodeURIComponent(document.querySelector('.blog-title').textContent);
            
            let shareUrl = '';
            
            if (this.classList.contains('twitter')) {
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
            } else if (this.classList.contains('linkedin')) {
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            } else if (this.classList.contains('facebook')) {
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Image Zoom
function setupImageZoom() {
    const images = document.querySelectorAll('.blog-content img');
    
    images.forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="image-modal-content">
                    <span class="image-modal-close">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                </div>
            `;
            
            // Add modal styles
            const style = document.createElement('style');
            style.textContent = `
                .image-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    z-index: 2000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .image-modal-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                .image-modal-content img {
                    width: 100%;
                    height: auto;
                    border-radius: 8px;
                }
                .image-modal-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(modal);
            
            // Close modal
            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target.classList.contains('image-modal-close')) {
                    document.body.removeChild(modal);
                    document.head.removeChild(style);
                }
            });
        });
    });
}

// Copy Code Button
function setupCopyCode() {
    document.querySelectorAll('pre').forEach(pre => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyButton.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 3rem;
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
        
        pre.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        
        pre.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        copyButton.addEventListener('click', async () => {
            const code = pre.querySelector('code').textContent;
            try {
                await navigator.clipboard.writeText(code);
                copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });
    });
}

// Search Highlight
function setupSearchHighlight() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search in this post...';
    searchInput.className = 'blog-search';
    searchInput.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 0.5rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 20px;
        background: var(--white);
        z-index: 1000;
        font-size: 0.9rem;
        width: 200px;
    `;
    
    document.body.appendChild(searchInput);
    
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            highlightSearch(this.value);
        }, 300);
    });
}

function highlightSearch(query) {
    // Remove previous highlights
    document.querySelectorAll('.search-highlight').forEach(el => {
        el.outerHTML = el.innerHTML;
    });
    
    if (!query) return;
    
    const content = document.querySelector('.blog-content');
    const regex = new RegExp(`(${query})`, 'gi');
    
    function highlightText(node) {
        if (node.nodeType === 3) { // Text node
            const text = node.textContent;
            const matches = text.match(regex);
            
            if (matches) {
                const highlighted = text.replace(regex, '<mark class="search-highlight">$1</mark>');
                const span = document.createElement('span');
                span.innerHTML = highlighted;
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === 1 && !node.classList.contains('search-highlight')) {
            Array.from(node.childNodes).forEach(highlightText);
        }
    }
    
    highlightText(content);
}

// Print Button
function setupPrintButton() {
    const printButton = document.createElement('button');
    printButton.innerHTML = '<i class="fas fa-print"></i> Print';
    printButton.className = 'print-btn';
    printButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 50px;
        cursor: pointer;
        z-index: 1000;
        box-shadow: var(--shadow);
    `;
    
    document.body.appendChild(printButton);
    
    printButton.addEventListener('click', () => {
        window.print();
    });
}

// Dark Mode Toggle
function setupDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 2rem;
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.75rem;
        border-radius: 50%;
        cursor: pointer;
        z-index: 1000;
        box-shadow: var(--shadow);
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        if (isDark) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Estimate Reading Time
function estimateReadingTime() {
    const content = document.querySelector('.blog-content');
    const text = content.textContent;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute
    
    const readingTimeElement = document.querySelector('.reading-time');
    if (readingTimeElement) {
        readingTimeElement.textContent = `${readingTime} min read`;
    }
}

// Lazy Loading for Images
function setupLazyLoading() {
    const images = document.querySelectorAll('.blog-content img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
}

// Auto-generate Table of Contents
function generateTOC() {
    const headings = document.querySelectorAll('.blog-content h2, .blog-content h3');
    if (headings.length === 0) return;
    
    const tocContainer = document.createElement('div');
    tocContainer.className = 'toc';
    tocContainer.innerHTML = `
        <h3>Table of Contents</h3>
        <ul></ul>
    `;
    
    const tocList = tocContainer.querySelector('ul');
    
    headings.forEach((heading, index) => {
        // Generate ID if not present
        if (!heading.id) {
            heading.id = `heading-${index}`;
        }
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        link.className = heading.tagName.toLowerCase();
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    // Insert TOC after the first paragraph
    const firstParagraph = document.querySelector('.blog-content p');
    if (firstParagraph) {
        firstParagraph.parentNode.insertBefore(tocContainer, firstParagraph.nextSibling);
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    estimateReadingTime();
    setupLazyLoading();
    generateTOC();
});

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + F: Focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('.blog-search');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Ctrl/Cmd + P: Print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
    
    // Escape: Clear search
    if (e.key === 'Escape') {
        const searchInput = document.querySelector('.blog-search');
        if (searchInput) {
            searchInput.value = '';
            highlightSearch('');
        }
    }
});

// Analytics (if needed)
function trackReadingProgress() {
    let maxScroll = 0;
    
    window.addEventListener('scroll', () => {
        const scrollPercent = Math.round((window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track progress milestones
            if (maxScroll >= 25 && maxScroll < 50) {
                console.log('25% read');
            } else if (maxScroll >= 50 && maxScroll < 75) {
                console.log('50% read');
            } else if (maxScroll >= 75 && maxScroll < 100) {
                console.log('75% read');
            } else if (maxScroll >= 100) {
                console.log('100% read');
            }
        }
    });
}

// Initialize tracking
trackReadingProgress();
