<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/root" name="wurui.snsbar">
        <!-- className 'J_OXMod' required  -->

        <div class="J_OXMod oxmod-snsbar" ox-mod="snsbar" data-uid="{login/uid}">
            <!--
            <section class="J_CmtList commentlist">
                <h1 class="title">热门评论</h1>
                <ul class="J_cmtUL"></ul>
            </section>
            -->
            <section class="J_Fixedbar fixed-bottom">

                <div class="snsbar">
                    <span class="cell">
                        <button type="button" data-action="comment" class="bt-comment">Comment...</button>
                    </span>
                    <span class="cell">
                        <button type="button" data-action="cmtlist" class="J_cmtcount bt-cmt-count">...</button>
                    </span>
                    <span class="cell">
                        <button type="button" data-action="fav" class="bt-fav J_fav"></button>
                    </span>
                    <span class="cell">
                        <button type="button" data-action="share" class="bt-share"></button>
                    </span>
                </div>
                <div data-anchor="comment" class="commentform">
                    <form class="J_commentForm">
                        <p class="comment-head">
                            <button type="reset" data-action="cancel">Cancel</button>
                            <span>Comment</span>
                            <button>Send</button>
                        </p>
                        <textarea name="content"></textarea>
                    </form>
                </div>
                <div data-anchor="share" class="shareform">
                    <div class="share-icons">
                        <a href="" class="lk-share">
                            <i class="lk-share-wx"></i>
                            <br/>微信
                        </a>
                        <a href="" class="lk-share">
                            <i class="lk-share-pyq"></i>
                            <br/>朋友圈
                        </a>
                        <a href="" class="lk-share">
                            <i class="lk-share-wb"></i>
                            <br/>新浪微博
                        </a>
                        <a href="" class="lk-share">
                            <i class="lk-share-zfb"></i>
                            <br/>支付宝好友
                        </a>
                    </div>
                    <p class="bottom-btn">
                        <button type="reset" data-action="cancel">Cancel</button>
                    </p>
                </div>
            </section>

            <script type="text/tpl" class="J_tplCmtList">
                <![CDATA[
{{#data}}<li class="comment-li">
<span class="pic" style="background-image:url({{user.avatar}})"></span><h4 class="user-name">{{user.name}} <span class="user-tag">- {{user.tag}}</span></h4>
<p class="time">{{displayTime}}</p>
<h3 class="content">
{{content}}
</h3>
</li>
{{/data}}

                ]]>
            </script>

        </div>
    </xsl:template>

</xsl:stylesheet>
