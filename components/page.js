import { style } from 'glamor';
import colors from '../style/colors';
import layout from '../style/layout';

export default ({children}) => (
  <div className={page}>
    {children}
  </div>
);

const page = style({
  padding: 15,
  maxWidth: layout.containerWidth,
  width: '100%',
  margin: '0 auto',
});