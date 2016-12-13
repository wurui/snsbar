<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/root" name="wurui.snsbar">
        <!-- className 'J_OXMod' required  -->
        <div class="J_OXMod oxmod-snsbar" ox-mod="snsbar">
            <div class="snsbar">
                <span class="cell">
                    <button type="button" data-action="comment" class="bt-comment">Comment...</button>
                </span>
                <span class="cell">
                    <button type="button" class="bt-cmt-count">1230</button>
                </span>
                <span class="cell">
                    <button type="button" class="bt-fav"></button>
                </span>
                <span class="cell">
                    <button type="button" class="bt-share"></button>
                </span>
            </div>
            <div data-anchor="comment" class="commentform">
                <form>
                    <p class="comment-head">
                        <button type="reset" data-action="cancel">Cancel</button>
                        <span>Comment</span>
                        <button>Send</button>
                    </p>
                    <textarea name="content"></textarea>
                </form>
            </div>
        </div>
    </xsl:template>

</xsl:stylesheet>
