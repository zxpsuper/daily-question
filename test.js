fetch('https://api.zsxq.com/v1.10/files/88281141154412/download_url', {
  method: 'GET',
  credentials: 'include',
})
  .then(res => res.json())
  .then(response => {
    console.log(response);
    const dataURL = response.resp_data.download_url;
    const link = document.createElement('a');
    link.download = name;
    link.href = dataURL;
    link.dispatchEvent(new MouseEvent('click'));
  });

function downfile(
  url,
  requestId = '74be5276c-bf68-62be-63a7-d1e0eb92ff1',
  signature = 'd0686493b0a557d5ce278ba57000be9d8aeb5a22',
  timestamp = '1581498845'
) {
  fetch(url, {
    method: 'GET',
    headers: {
      'X-Request-Id': requestId,
      'X-Signature': signature,
      'X-Timestamp': timestamp,
      'X-Version': '1.10.35',
    },
    credentials: 'include',
  })
    .then(res => res.json())
    .then(response => {
      console.log(response);
      if (response.resp_data.topics.length === 0) return;
      response.resp_data.topics.forEach((element, index) => {
        setTimeout(() => {
          if (
            element.talk &&
            element.talk.files &&
            element.talk.files[0] &&
            element.talk.files[0].file_id
          ) {
            element.talk.files.forEach(item => {
              fetch(
                `https://api.zsxq.com/v1.10/files/${item.file_id}/download_url`,
                {
                  method: 'GET',
                  credentials: 'include',
                }
              )
                .then(res2 => res2.json())
                .then(response2 => {
                  console.log(item.name + ' 已下载');
                  let dataURL = response2.resp_data.download_url;
                  let link = document.createElement('a');
                  link.download = name;
                  link.href = dataURL;
                  link.dispatchEvent(new MouseEvent('click'));
                });
            });
          } else {
            console.log(element);
          }
          if (index === response.resp_data.topics.length - 1) {
            let time = response.resp_data.topics[
              response.resp_data.topics.length - 1
            ].create_time.replace(' ', '+');

            let arr = time.split('.');
            let ms =
              (+arr[1].slice(0, 3) - 1 + '').length === 3
                ? +arr[1].slice(0, 3) - 1 + ''
                : (+arr[1].slice(0, 3) - 1 + '').length === 2
                ? '0' + (+arr[1].slice(0, 3) - 1 + '')
                : '00' + (+arr[1].slice(0, 3) - 1 + '');
            time = arr[0] + '.' + ms + arr[1].slice(3);
            console.log('time=' + time);
            downfile(
              `https://api.zsxq.com/v1.10/groups/145421544582/topics?scope=digests&count=20&end_time=${encodeURIComponent(
                time
              )}`
            );
          }
        }, 2000 * index);
      });
    });
}

downfile(
  'https://api.zsxq.com/v1.10/groups/145421544582/topics?scope=digests&count=20'
);
