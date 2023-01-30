import "./style.scss";
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'


type UserProps = {
  id: number,
  name: string,
  companyId: number,
  unityId: number,
  image: string,
  model: string,
  status: string,
  healthScore: number,
  assignedUserIds: Array<number>,
  specifications: {
    maxTemp: number,
    power: number,
    rpm: number,
    [key: string]: number;
  },
  healthHistory: {
    [key: string]: {
      status: string,
      timestamp: string,
    };
  },
  sensors: Array<number>,
}


const AssetsCard = (props: UserProps) => {

  const [user, setUser] = useState<string[]>([]);
  let data = []
  let time = []
  let mounth = ""

  ////////////////////////Grafics mapping/////////////////////////////
  let healthScore = {
    credits: {
      enabled: false
    },
    chart: {
      backgroundColor: null,
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
      text: '',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    plotOptions: {
      pie: {
        colors: [
          '#b2d8b2',
          '#F4F7FD',
        ],
        allowPointSelect: true,
        cursor: 'pointer',
        size: "150%",
        dataLabels: {
          enabled: false,
          format: '{point.percentage:.1f} %',
          distance: -20,
          filter: {
            property: 'percentage',
            operator: '>',
            value: 4
          }
        }
      }
    },
    series: [{
      data: [
        { name: 'Heath Score', y: props.healthScore },
        { name: '', y: 100 - props.healthScore },
      ]
    }]
  };


  let statusHistory = {
    credits: {
      enabled: false
    },
    title: {
      text: '',
    },

    yAxis: {
      title: {
        text: 'Status'
      },
      categories: ["", "Planned Stop", "Unplanned Stop", "In Alert", "In Downtime", "In Operation"],
    },

    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false
        },
        pointStart: 0
      }
    },

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };
  for (let i in props.healthHistory) {
    mounth = props.healthHistory[i].timestamp.substring(5, 7)
    switch (props.healthHistory[i].status) {
      case 'inOperation':
        data.push([props.healthHistory[i].status, 5])
        time.push(props.healthHistory[i].timestamp.substring(8, 10))
        break
      case 'inDowntime':
        data.push([props.healthHistory[i].status, 4])
        time.push(props.healthHistory[i].timestamp.substring(8, 10))
        break
      case 'inAlert':
        data.push([props.healthHistory[i].status, 3])
        time.push(props.healthHistory[i].timestamp.substring(8, 10))
        break;
      case 'unplannedStop':
        data.push([props.healthHistory[i].status, 2])
        time.push(props.healthHistory[i].timestamp.substring(8, 10))
        break;
      case 'plannedStop':
        data.push([props.healthHistory[i].status, 1])
        time.push(props.healthHistory[i].timestamp.substring(8, 10))
        break;
      default:
    }
  }
  Object.assign(statusHistory, {
    series: [{
      data: data,
      name: "Status/Day"
    }],
    xAxis: {
      accessibility: {
        rangeDescription: 'Day'
      },
      categories: time,
      title: {
        text: 'Day of month'
      },
    },
  });
  ////////////////////////End Grafics mapping/////////////////////////////

  useEffect(() => {

    const getUsers = async (id: number) => {
      const res = await fetch("https://my-json-server.typicode.com/tractian/fake-api/users/" + id);
      const listItens = await res.json();
      setUser(current => [...current, listItens.name]);
    }

    for (let index in props.assignedUserIds) {
      getUsers(props.assignedUserIds[index])
    }
  }, [props.assignedUserIds])


  return (
    <Card className="cardAsset">

      <div className="rowCard1">
        <div className="col1">
          <div className="rowCardImage">
            <div className="imageBoxAsset">
              <img src={props.image} alt="User" className="assetImage" />
            </div>
          </div>
          <div className="rowCardDescription">
            <div className="descriptionCard">
              Name: <span className="nameAsset">{props.name}</span><br />
              Model: <span className="nameAsset">{props.model}</span><br />
              <div className={`statusWarning ${props.status === "inAlert" ? "warningStatus" : (props.status === "inOperation" ? "operationStatus" : "downtimeStatus")}`}>{props.status}</div>
            </div>
          </div>
        </div>
        <div className="col2">
          <div className="infoAsset">
            <div className="delegatedInfo">
              <span className="titleChart">Responsible users:</span>
              {user.map((assets, id) => (
                <div key={id} className="nameChart">
                  {assets}
                </div>
              ))}
            </div>
            <div className="specificationsInfo">
              <span className="titleChart">Specifications:</span>
              {Object.keys(props.specifications).map(key => {
                return (
                  <div key={key} className="nameChart">
                    {key === 'maxTemp' ? "max temperature" : key} : {props.specifications[key] != null ? props.specifications[key] : "Dado inexistente"}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="infoChart">
            <div className="boxInfoChartCompany">
              <span className="titleChart">Sensors:</span>
              {props.sensors.map((sensors) => (
                <div className="nameChart">
                  {sensors}
                </div>
              ))}
            </div>
            <div className="boxInfoChartDonut">
              <HighchartsReact
                containerProps={{ style: { height: "100%", width: "100%" } }}
                highcharts={Highcharts}
                options={healthScore}
              />
              <span style={{ fontSize: "13px" }}>Heath Score: {props.healthScore}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rowCard2">
        <div className="cardHistory">
          <HighchartsReact
            containerProps={{ style: { height: "100%", width: "100%" } }}
            highcharts={Highcharts}
            options={statusHistory}
          />
          <span className="labelHistory">Month {mounth} History</span>
        </div>
      </div>
    </Card>
  );
};

export default AssetsCard;
