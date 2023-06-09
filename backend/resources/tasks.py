from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource
from database.models import db, Task
from database.schemas import task_schema, tasks_schema


class AllTaskResource(Resource):
    def get(self):
        tasks = Task.query.all()
        task = request.args.get('task')
        if task:
            tasks = Task.query.filter_by(task=task)
        return tasks_schema.dump(tasks), 200
    
class UserTaskResource(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_tasks = Task.query.filter_by(user_id=user_id)
        status = request.args.get('status')
        category = request.args.get('category')
        timeframe = request.args.get('timeframe')
        if status:
            user_tasks = user_tasks.filter_by(status=status)
        if category: 
            user_tasks = user_tasks.filter_by(category=category)
        if timeframe: 
            user_tasks = user_tasks.filter_by(timeframe=timeframe)    
        return tasks_schema.dump(user_tasks), 200

        # # Alternate version where JWT is used, but not required
        # try:
        #     verify_jwt_in_request()
        #     user_id = get_jwt_identity()
        # # Do stuff with token
        # except:
        # # Do stuff without token
        #     return "Unauthorized", 401

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        form_data = request.get_json()
        new_task = task_schema.load(form_data)
        new_task.user_id = user_id
        db.session.add(new_task)
        db.session.commit()
        return task_schema.dump(new_task), 201
    
class TaskDetailResource(Resource):

    @jwt_required()
    def put(self, task_id):
        task_from_db = Task.query.get(task_id)
        if not task_from_db:
            return {'message': 'Task not found'}, 404
        if 'task' in request.json:
            task_from_db.task = request.json['task']
        if 'category' in request.json:
            task_from_db.category = request.json['category']
        if 'status' in request.json:
            task_from_db.status = request.json['status']
        if 'point_value' in request.json:
            task_from_db.point_value = request.json['point_value']
        if 'timeframe' in request.json:
            task_from_db.timeframe = request.json['timeframe']
        if 'start_date' in request.json:
            task_from_db.start_date = request.json['start_date']
        if 'end_date' in request.json:
            task_from_db.end_date = request.json['end_date']
        # task.task = data.get('task', task.task)
        # task.category = data.get('category', task.category)
        # task.status = data.get('status', task.status)
        # task.point_value = data.get('point_value', task.point_value)
        # task.start_date = data.get('start_date', task.start_date)
        # task.end_date = data.get('end_date', task.end_date)
        db.session.commit()
        return task_schema.dump(task_from_db), 200
    
    @jwt_required()
    def delete(self, task_id):
        task_from_db = Task.query.get(task_id)
        if not task_from_db:
            return {'message': 'Task not found'}, 404
        db.session.delete(task_from_db)
        db.session.commit()

        return '', 204


