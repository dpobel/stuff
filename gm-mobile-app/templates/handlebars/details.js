{{#with train}}
<header>
    {{> backhome}}
    <h1>{{type}} N°{{num}} ({{startDate}})</h1>
</header>
<ul class="gm-train{{#if lateTime}} late{{/if}}">
    <li>Départ de <strong>{{start}}</strong> à <strong>{{startTime}}</strong></li>
    <li>Arrivée à <strong>{{destination}}</strong> à <strong>{{destinationTime}}</strong> (Durée&nbsp;: {{duration}})</li>
    {{#if lateTime}}
    <li class="gm-train-late"><strong>‼&nbsp;Retard {{lateTime}} min.</strong>{{#if details}}&nbsp;: <em>{{details}}</em>{{/if}}</li>
    {{/if}}
</ul>

<ul class="gm-stops">
    {{#each stops}}
        <li>
            <span class="time">{{#if stopTime}}{{stopTime}}{{else}}{{startTime}}{{/if}}</span>
            {{name}}{{#if lateTime}} <span class="late">(Retard {{lateTime}} min.)</span>{{/if}}
        </li>
    {{/each}}
</ul>
{{/with}}
