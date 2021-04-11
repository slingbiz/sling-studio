import React from 'react';
import MaterialTable from 'material-table';

const DetailPanel = () => {
  return (
    <MaterialTable
      title='One Detail Panel Preview'
      columns={[
        {title: 'Name', field: 'name'},
        {title: 'Surname', field: 'surname'},
        {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
        {
          title: 'Birth Place',
          field: 'birthCity',
          lookup: {34: 'İstanbul', 63: 'Şanlıurfa'},
        },
      ]}
      data={[
        {name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63},
        {name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34},
      ]}
      detailPanel={(rowData, index) => {
        return (
          <iframe
            width='100%'
            height='315'
            src='https://www.youtube.com/embed/C0DPdy98e4c'
            title={`rowData-${index}`}
            frameborder='0'
            allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            allowfullscreen
          />
        );
      }}
    />
  );
};
export default DetailPanel;
