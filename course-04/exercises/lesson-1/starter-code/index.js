const AWS = require('aws-sdk')
const axios = require('axios')

// Name of a service, any string
const serviceName = process.env.SERVICE_NAME
// URL of a service to test
const url = process.env.URL

// CloudWatch client
const cloudwatch = new AWS.CloudWatch();

exports.handler = async (event) => {
  // TODO: Use these variables to record metric values
  let endTime
  let requestWasSuccessful

  const startTime = timeInMs()
  // const requ = await axios.get(url)
  try {
    const res = await axios.get(url)
    console.log(res.status);
    // requestWasSuccessful = 200;
    requestWasSuccessful = true
    putCLoudWatch();
  } catch (error) {
    requestWasSuccessful = false;
    putCLoudWatch();
  }

  async function putCLoudWatch() {
    // Example of how to write a single data point
    await cloudwatch.putMetricData({
      MetricData: [{
          MetricName: 'Latency', // Use different metric names for different values, e.g. 'Latency' and 'Successful'
          Dimensions: [{
            Name: 'ServiceName',
            Value: serviceName
          }],
          Unit: 'Milliseconds', // 'Count' or 'Milliseconds'
          Value: Number(getLatency()) // Total value
        },
        {
          MetricName: 'Successful', // Use different metric names for different values, e.g. 'Latency' and 'Successful'
          Dimensions: [{
            Name: "ServiceName",
            Value: serviceName
          }],
          Unit: 'Count', // 'Count' or 'Milliseconds'
          Value: requestWasSuccessful ? 1:0 // Total value
        }
      ],
      Namespace: 'Udacity/Serveless'
    }).promise()
  }
  // TODO: Record time it took to get a response
  function getLatency() {
    endTime = timeInMs() - startTime;
    console.log(`Latency ${endTime}`);
    return Number(endTime);
  }
  // TODO: Record if a response was successful or not
  // My method too long
  // function checkSuccess() {
  //   console.log(`Request status ${requestWasSuccessful}`);
  //   return requestWasSuccessful;
  // }
}

function timeInMs() {
  return new Date().getTime()
}