import React from 'react';
import queryString from 'query-string';
import './menual/stickyContent.css';
const CategorySample = ({location, match}) => {
    const query = queryString.parse(location.search);
    console.log(query);
    return (
        <div className="bd-main">
            {/* <h2>Category2 {match.params.name}</h2> */}
            <div class="bd-toc mt-4 mb-5 my-md-0 ps-xl-3 mb-lg-5 text-muted">
          <strong class="d-block h6 my-2 pb-2 border-bottom">On this page</strong>
          <nav id="TableOfContents">
  <ul>
    <li><a href="#how-it-works">How it works</a></li>
    <li><a href="#example-in-navbar">Example in navbar</a></li>
    <li><a href="#example-with-nested-nav">Example with nested nav</a></li>
    <li><a href="#example-with-list-group">Example with list-group</a></li>
    <li><a href="#usage">Usage</a>
      <ul>
        <li><a href="#via-data-attributes">Via data attributes</a></li>
        <li><a href="#via-javascript">Via JavaScript</a></li>
        <li><a href="#methods">Methods</a>
          <ul>
            <li><a href="#refresh">refresh</a></li>
            <li><a href="#dispose">dispose</a></li>
            <li><a href="#getinstance">getInstance</a></li>
          </ul>
        </li>
        <li><a href="#options">Options</a></li>
        <li><a href="#events">Events</a></li>
      </ul>
    </li>
  </ul>
</nav>
        </div>

        <div className="bd-content ps-lg-4">
        <h2 id="how-it-works">How it works<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#how-it-works"></a></h2>
<p>Scrollspy has a few requirements to function properly:</p>
<ul>
<li>It must be used on a Bootstrap <a href="/docs/5.0/components/navs-tabs/">nav component</a> or <a href="/docs/5.0/components/list-group/">list group</a>.</li>
<li>Scrollspy requires <code>position: relative;</code> on the element you’re spying on, usually the <code>&lt;body&gt;</code>.</li>
<li>Anchors (<code>&lt;a&gt;</code>) are required and must point to an element with that <code>id</code>.</li>
</ul>
<p>When successfully implemented, your nav or list group will update accordingly, moving the <code>.active</code> class from one item to the next based on their associated targets.</p>
<div className="bd-callout bd-callout-info">
<h3 id="scrollable-containers-and-keyboard-access">Scrollable containers and keyboard access</h3>
<p>If you’re making a scrollable container (other than the <code>&lt;body&gt;</code>), be sure to have a <code>height</code> set and <code>overflow-y: scroll;</code> applied to it—alongside a <code>tabindex="0"</code> to ensure keyboard access.
</p></div>
<h2 id="example-in-navbar">Example in navbar<a className="anchorjs-link " aria-label="Anchor" data-anchorjs-icon="#" href="#how-it-works"></a></h2>
<div className="empty-area">

</div>

<div className="empty-area">

</div>
<div className="empty-area">

</div>
<div className="empty-area">

</div>

        </div>


            
            
        </div>
    );
};

export default CategorySample;