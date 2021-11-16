use serde::Deserialize;
use serde_json::Value;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WsMsg {
    pub author: String,
    pub exam_id: String,
    pub answers: Vec<Answer>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Answer {
    pub problem_id: usize,
    pub result: Value,
}
