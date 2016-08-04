/**
 * Created by elemelyn on 16/8/3.
 */

import React from 'react';
import SourceLink from '../../common/SourceLink';
import ArtTitle from '../../common/ArtTitle';
import CodePanel from '../../common/CodePanel';
import './multiBackground.css';

export default class MultiBackground extends React.Component {
  render() {
    return (
      <ul className="effect1">
        <ArtTitle title={'多重背景图实现动画特效'}/>
        <SourceLink linkUrl={'http://www.webhek.com/multiple-background-css-animations'} />

        <div className="animate-area"></div>

        <p>如题: 本篇总结的内容是利用 <strong>多重背景图</strong> 来实现动画的效果。</p>

        <p>首先， 导入多个背景图片， 并确定其初始位置（ 注意， 各图片的层次关系按照 css 中的顺序来 ）</p>
        <CodePanel sourceCode={`
  .animate-area	{
    background-image: url(twitter-logo-bird.png), url(treehouseFrog.png), url(bg-clouds.png);
    background-position: 20px -90px, 30px 80px, 0px 0px;
    background-repeat: no-repeat, no-repeat, repeat-x;
  }
        `}/>

        <p>然后， 添加背景图片的运动路径</p>

        <CodePanel sourceCode={`
  @keyframes animatedBird {
    from { background-position: 20px 20px, 30px 80px, 0 0; }
    to { background-position: 300px -90px, 30px 20px, 100% 0; }
  }

  .animate-area	{
    animation: animatedBird 4s linear infinite;
  }
        `}/>

        <p>于是， 动画效果就出来了。</p>

      </ul>
    );
  }
}

