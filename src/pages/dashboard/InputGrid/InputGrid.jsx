import { v4 as uuidv4 } from 'uuid';
import { useFormikContext } from 'formik';
import NameCell from './Cells/NameCell';
import DescriptionCell from './Cells/DescriptionCell';
import { FieldArrayGrid } from 'react-input-grid';

export const InputGrid = () => {
  const emptyArticles = {
    id: uuidv4(),
    name: '',
    description: '',
  };

  let inputColumns = [
    {
      header: 'نام',
      content: NameCell,
      width: '160px',
      minWidth: '100px',
    },
    {
      header: 'شرح',
      content: DescriptionCell,
      width: '160px',
      minWidth: '100px',
    }
  ];

  return (
    <FieldArrayGrid
      columns={inputColumns}
      emptyRowObject={emptyArticles}
      fieldArrayName='articles'
      title={'اقلام'}
      indexHeader={'ردیف'}
      rtlEnabled={true}
      showDelete={false}
    />
  );
};
