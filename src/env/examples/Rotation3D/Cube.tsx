import type {FC} from 'react';
import classNames from 'classnames';

import classes from './Cube.module.css';

export const Cube: FC = () => {
    return (
        <div className={classes.scene}>
            <div className={classes.cube}>
                <div className={classNames(classes.face, classes.front)}>front</div>
                <div className={classNames(classes.face, classes.back)}>back</div>
                <div className={classNames(classes.face, classes.right)}>right</div>
                <div className={classNames(classes.face, classes.left)}>left</div>
                <div className={classNames(classes.face, classes.top)}>top</div>
                <div className={classNames(classes.face, classes.bottom)}>bottom</div>
            </div>
        </div>
    );
};
