exports.getCompactTask = (task) => {
  return {
    id: task._id,
    content: task.content,
    ownerId: task.owner_id,
    order: task.order,
    completed: task.completed,
    deleted: task.deleted,
    createdDate: task.created_date,
    modifiedDate: task.modified_date,
    dateTime: task.date_time
  }
}
