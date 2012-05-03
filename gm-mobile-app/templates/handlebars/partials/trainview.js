<li class="{{#if details}}late{{/if}}" data-train-num="{{num}}" data-train-date="{{startDate}}" data-train-type="{{type}}">
    <div class="yui3-g">
        <div class="yui3-u-5-6 gm-infos">
            <span class="time">{{startTime}}</span>
            {{#if details}}&ndash; <span class="details">{{details}}</span>{{/if}}
            {{#if platform}} &ndash; <span title="voie" class="info"> {{platform}}</span>{{/if}}
        </div>
        <div class="yui3-u-1-6 gm-num">
            {{#if type}}{{type}}{{/if}}
        </div>
        <div class="yui3-u-5-6 gm-destination"><strong>{{destination}}</strong></div>
        <div class="yui3-u-1-6 gm-num">
            {{#if num}}<span title="N°" class="info">{{num}}</span>{{/if}}
        </div>
    </div>
</li>

