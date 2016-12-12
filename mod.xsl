<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/root" name="wurui.snsbar">
        <!-- className 'J_OXMod' required  -->
        <div class="J_OXMod oxmod-snsbar" ox-mod="snsbar">
            <span class="cell">
                <button type="button" class="bt-comment">Comment...</button>
            </span>
            <span class="cell">
                <button type="button" class="bt-cmt-count">98</button>
            </span>
            <span class="cell">
                <button type="button" class="bt-fav"></button>
            </span>
            <span class="cell">
                <button type="button" class="bt-share"></button>
            </span>


        </div>
    </xsl:template>

</xsl:stylesheet>
