var nodes = new vis.DataSet();
var edges = new vis.DataSet();
var container = document.getElementById('mynetwork');
var data = {
    nodes: nodes,
    edges: edges
};
var options = {
    nodes:{
        borderWidth: 1,
        borderWidthSelected: 1,
        chosen: true,
      //  shape: 'dot', //圆点
        size:15,     //圆点大小
        color: {
          border: '#2B7CE9',
          background: '#97C2FC',
          highlight: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          },
          hover: {
            border: '#2B7CE9',
            background: '#D2E5FF'
          },
        },
         fixed: {
          x:false, //true:节点不会沿X方向移动。
          y:false  //true:节点不会沿y方向移动。
        },
   
    },
    // groups:{
    //     "big":{
    //         shape:'dot',
    //         color:'red'
    //     },
    //      "small":{
    //         shape:'star',
    //         color:'green'
    //     }
    // },
    edges:{
         // arrows: 'to, from',
        // color: {
        //     color: 'red'
        // },
        font: '12px arial #ff0000',
        scaling:{
          label: true,
        },
        shadow: true,
        smooth: true,
    }
};
var network = new vis.Network(container, data, options);

// 动态创建节点（时间戳）
function randomAddNode() {
    var type = 0
    if (Math.random() > 0.7)
        type = 1
    // var id = Date.now();
     var id = (Math.random() * 100).toFixed(2);

    var fId = this.randomGetNodeId()
    this.addNode(id, id, null)
    // this.addEdge(fId, id, type)

}

// 添加节点
function addNode(id, label, title) {
    console.log('addNode id:'+id+'--addNode label:'+label+'--addNode title:'+title)
    nodes.add({
        id: id,
        label: id,
        // group:new Number(id).toFixed(0)>50 ? 'big' : 'small'
        shape:'image',
        image:new Number(id).toFixed(0)>50 ? 'image/aa.svg':'image/bb.svg'
    })
      // console.log(this.options)
    this.addHisLog('node:' + id + ' add to container.');
}

// 动态添加连接线
function randomAddEdge() {
    var fId = this.randomGetNodeId()
    var tId = this.randomGetNodeId()
    if (fId == tId)
        return;
    var type = 0
    if (Math.random() > 0.7)
        type = 1
    this.addEdge(fId, tId, type)
}

// 添加连接线
function addEdge(fromId, toId, type) {
      console.log(fromId+'-->'+toId+':'+type)
     
    var edge = {
        from: fromId,
        to: toId,
    }
    // 有箭头
    if (type === 1) {
      //  edge['label'] = 'releation' //releation:有箭头(label)
        edge.arrows = 'to'
        edge.length = 400
    } else {
    //    edge['label'] = 'arrows:circle'  //arrows:circle:无箭头
        edge.arrows = {
            to: {
                type: 'circle'
            }
        }
        edge.length = 200
    }
    console.log('edge:'+JSON.stringify(edge))
    edges.add(edge);
    console.log('edges:'+ JSON.stringify(edges))
    this.addHisLog('edge:' + fromId + ' ---> ' + toId + ' .type:' + type + ' add to container.');
}

// 动态获取节点id
function randomGetNodeId() {
   console.log('nodes:'+JSON.stringify(nodes))
    // Object.getOwnPropertyNames:返回对象的所有自身属性的属性名（包括不可枚举的属性）组成的数组，但不会获取原型链上的属性。
    var names = Object.getOwnPropertyNames(nodes._data);
    var len = names.length;
    var index = Math.floor(Math.random() * len);
    console.log('names:'+names)
     console.log('names[index]--'+names[index])
    return names[index];
}

// 添加日志
function addHisLog(message) {
    $('#hisLog').prepend('<div>' + message + '</div>')
    $('#hisLog div').remove('div:gt(8)')
}

network.on("click", function(params) {
    console.log(params)
    console.log(this.body)
  

    // setTimeout(function(){
    //      var names1 = Object.getOwnPropertyNames(nodes._data);
    //      var len1 = names.length;
    //      var index1 = Math.floor(Math.random() * len);
    // },3000)



    // randomAddNode()
    // if (params.nodes.length == 0)
    //     return;
    // var names = Object.getOwnPropertyNames(nodes._data);
    // var len = names.length;
    // var index = Math.floor(Math.random() * len);
    // var _edgeId = names[index]

    // var id = Date.now();
    // nodes.add({
    //     id: id,
    //     label: id
    // })
    // var edge = {
    //     from: params.nodes[0],
    //     to: id,
    // }
    // if (Math.random() > 0.5) {
    //     edge['label'] = 'releation'
    //     edge.arrows = 'to'
    //     edge.color = 'red'
    // } else {
    //     edge['label'] = '父子'
    //     edge.arrows = {
    //         to: {
    //             type: 'circle'
    //         }
    //     }
    // }
    // edges.add(edge);
});


$('#addTo').click(function() {
    _setIntervalId = setInterval(randomAddNode, 3000)
})
$('#stop_addTo').click(function() {
    clearInterval(_setIntervalId)
})
$('#add_edge').click(function() {
    _setIntervalId2 = setInterval(randomAddEdge, 3000)
})
$('#stop_edge').click(function() {
    clearInterval(_setIntervalId2)
})