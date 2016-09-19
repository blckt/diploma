import { IRouteConfiguration } from 'hapi';
import {indexRoute} from './indexRoute';
const configurationsOptions: Array<IRouteConfiguration> = [].concat(indexRoute);

export default configurationsOptions;
