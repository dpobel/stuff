<header>
    {{> backhome}}
    <h1>{{station.name}}</h1>
</header>
<h2>Départs de {{station.name}}{{#if time}} à partir de {{time}}{{/if}}</h2>
<ul class="gm-departures">
    {{#each trains}}
        {{> trainview}}
    {{/each}}
</ul>
